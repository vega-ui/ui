'use client';

import { useContext } from 'react';
import { CalendarContext } from '../providers';

export const useCalendarContext = () => useContext(CalendarContext)