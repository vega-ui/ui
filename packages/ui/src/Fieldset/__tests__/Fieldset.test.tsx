import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react'
import { Fieldset } from '../Fieldset.tsx';
import { FieldsetHeader, FieldsetLegend } from '../components';

const TITLE = 'TITLE'

describe('Fieldset', () => {
  it('render', () => {
    render(
      <Fieldset>
        <FieldsetHeader>
          <FieldsetLegend>{TITLE}</FieldsetLegend>
        </FieldsetHeader>
      </Fieldset>
    )
    expect(screen.getByText(TITLE)).toBeDefined()
  })
})