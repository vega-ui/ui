import fs from 'node:fs';
import path from 'node:path';

const API = 'https://api.github.com/repos/vega-ui/ui/actions';
const ENGINES = ['chromium', 'firefox', 'webkit'];
const output = path.join(process.cwd(), 'generated/ci.json');
const { GITHUB_TOKEN, GITHUB_WORKFLOW, GITHUB_RUN_ID } = process.env;
const headers: Record<string, string> = GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {};

interface Job {
  name: string
  conclusion: string | null
  completed_at: string | null
  html_url: string
}

const request = async <T,>(url: string) => {
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json', ...headers } });
  if (!response.ok) throw new Error(`${response.status} ${url}`);

  return await response.json() as T;
};

const findRun = async () => {
  if (GITHUB_WORKFLOW === 'Release' && GITHUB_RUN_ID) return GITHUB_RUN_ID;

  const { workflow_runs: runs } = await request<{ workflow_runs: { id: number }[] }>(`${API}/workflows/release.yml/runs?branch=main&status=completed&per_page=1`);

  return runs[0]?.id;
};

const readCi = async () => {
  const run = await findRun();
  if (!run) return null;

  const { jobs } = await request<{ jobs: Job[] }>(`${API}/runs/${run}/jobs?per_page=50`);
  const engines = ENGINES.map((engine) => [engine, jobs.find((job) => job.name.endsWith(`Browser Tests (${engine})`))] as const);
  const dates = engines.flatMap(([, job]) => job?.completed_at ? [job.completed_at] : []).sort();

  return {
    date: dates.at(-1) ?? null,
    engines: Object.fromEntries(engines.map(([engine, job]) => [engine, job ? { passed: job.conclusion === 'success', url: job.html_url } : null])),
  };
};

const ci = await readCi().catch((error: Error) => {
  console.warn(`CI status is unavailable: ${error.message}`);
  return null;
});

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, `${JSON.stringify(ci, null, 2)}\n`);
console.log(`CI status written to ${path.relative(process.cwd(), output)}`);
