import React from 'react';
import AppEntry from './AppEntry';
import { createRoot } from 'react-dom/client';

const root = createRoot(document.getElementById('root'));

root.render(<AppEntry />, root, () => root.setAttribute('data-ouia-safe', true));
