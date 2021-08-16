import { useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { Descriptions, PageHeader, Tag, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { Character } from '../features/characters/characterSlice';
import { CharacterEditForm } from '../components/CharacterEditForm';
import { useAppSelector } from '../hooks/useAppSelector';

const { Text, Paragraph } = Typography;

export function CharacterDetail() {
  const { state: routeState } = useLocation<{ character: Character }>(); 
  const { characterId } = useParams<{ characterId: string }>();
  const character = useAppSelector(state =>
    state.characters.value.results.find(({ id }) => id === Number(characterId)) ?? routeState.character
  ); // use routeState as a fallback

  const [formVisibility, setFormVisibility] = useState(false);

  const characterHasSeries = character.series.available >= 1;

  function showEditForm() {
    setFormVisibility(true);
  }

  function closeEditForm() {
    setFormVisibility(false);
  }

  return (
    <PageHeader
        title={character.name}
        avatar={{ src: `${character.thumbnail.path}/portrait_small.${character.thumbnail.extension}` }}
        onBack={() => window.history.back()}
        extra={[
            <EditOutlined
                key="1"
                style={{ fontSize: '24px', color: '#08c', cursor: 'pointer' }}
                onClick={() => showEditForm()}
            />,
            <CharacterEditForm
                key="2"
                visible={formVisibility}
                character={character}
                onCloseModal={() => closeEditForm()}
            />
        ]}
    >
        <Descriptions title='Description'>
            <Descriptions.Item>
                <Paragraph>{
                    character.description.trim()
                        ? character.description
                        : 'There\'s no description.'
                }</Paragraph>
            </Descriptions.Item>
        </Descriptions>

        <Descriptions title='Series' column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            {characterHasSeries && character.series.items.map(serie => (
                <Descriptions.Item key={serie.name}>
                    <Tag color="blue">
                        <Text
                            style={{ width: 200 }}
                            ellipsis={{ tooltip: serie.name }}
                        >
                            {serie.name}
                        </Text>
                    </Tag>
                </Descriptions.Item>
            ))}
            {!characterHasSeries && (<Paragraph>There's no series.</Paragraph>)}
        </Descriptions>
    </PageHeader>
  );
}
