import { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { Descriptions, PageHeader, Tag, Typography } from 'antd';

import { Character, DataResponse } from '../features/characters/characterSlice';
import { api } from '../services/api';

const { Text, Paragraph } = Typography;

export function CharacterDetail() {
  const { state } = useLocation<{ character: Character }>();
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState(state.character);
  const characterHasSeries = character.series.available >= 1;

  useEffect(() => {
    async function fetchCharacter() {
        const { data: resData } = await api.get<{ data: DataResponse }>(`/v1/public/characters/${characterId}`);
        const [ retrievedCharacter ] = resData.data.results;
        setCharacter(retrievedCharacter);
    }

    if (!character) {
        fetchCharacter();
    }
  }, [characterId, character]);

  return (
    <PageHeader
        title={character.name}
        avatar={{ src: `${character.thumbnail.path}/portrait_small.${character.thumbnail.extension}` }}
        onBack={() => window.history.back()}
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
