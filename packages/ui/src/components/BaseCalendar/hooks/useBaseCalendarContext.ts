'use client';

import { useContext } from 'react';
import { BaseCalendarContext } from '../providers';

export const useBaseCalendarContext = () => useContext(BaseCalendarContext)