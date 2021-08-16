import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Button, Form, Input } from 'antd';

import { Character, updateCharacterData } from '../../features/characters/characterSlice';

interface CharacterEditFormProps {
    visible: boolean;
    character: Character;
    onCloseModal: () => void;
};

export function CharacterEditForm({ visible, character, onCloseModal }: CharacterEditFormProps) {
    const [name, setName] = useState(character.name);
    const [description, setDescription] = useState(character.description);
    const dispatch = useDispatch();

    function handleSubmit() {
        if (!name) {
            return;
        }

        dispatch(updateCharacterData({
            characterId: character.id,
            data: { name, description },
        }));
        onCloseModal();
    }

    return (
        <Modal
            visible={visible}
            closable={false}
            footer={[
                <Button key="back" onClick={() => onCloseModal()}>
                    Cancel
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    disabled={!name}
                    onClick={() => handleSubmit()}
                >
                    Save
                </Button>
            ]}
        >
            <Form initialValues={{ name, description }}>
                <Form.Item
                    label="Name"
                    name="name"
                    rules={[{ required: true, message: 'Name is required!' }]}
                >
                    <Input value={name} onChange={(ev) => setName(ev.target.value.trim())} />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: false }]}
                >
                    <Input.TextArea
                        rows={4}
                        value={description}
                        onChange={(ev) => setDescription(ev.target.value.trim())}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}