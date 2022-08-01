
import React from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { ColorPicker } from './color-picker';

export interface Category {
    name: string;
    color: number;
}

interface ModalProps {
    isOpen: boolean;
    close: () => void;
    saveCategory: (cat: Category) => void;
}

const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const CreateCategoryModal = ({ isOpen, close, saveCategory }: ModalProps) => {
    const [name, setName] = React.useState('');
    const [color, setColor] = React.useState(0);

    return <Modal
        open={isOpen}
        onClose={close}
        aria-labelledby="modal-modal-title"
    >
        <Box sx={modalStyle}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <TextField
                    id="standard-textarea"
                    label="Add a Category"
                    // placeholder="Enter Category"
                    multiline
                    variant="standard"
                    fullWidth
                    value={name}
                    onChange={({ target: { value } }) => setName(value)}
                />
            </Box>
            <ColorPicker
                selectColor={(color: number) => setColor(color)}
                selected={color}
            />
            <Button
                variant="contained" size="large"
                onClick={() => {
                    close();
                    saveCategory({ color, name });
                }}
            >
                Add
            </Button>
        </Box>
    </Modal>
}