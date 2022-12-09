import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { DevicesPage } from '../../../old/pages/DevicesPage';

export default createBoard({
    name: 'Recipe',
    Board: () => <div>
        <DevicesPage />
    </div>
});
