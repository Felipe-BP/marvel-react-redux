import { useEffect, useState } from 'react';

import { useLocation, useParams } from 'react-router-dom';
import { Descriptions, PageHeader, Tag } from 'antd';
import Paragraph from 'antd/lib/typography/Paragraph';

import { Character, DataResponse } from '../features/characters/characterSlice';
import { api } from '../services/api';

export function CharacterDetail() {
  const { state } = useLocation<{ character: Character }>();
  const { characterId } = useParams<{ characterId: string }>();
  const [character, setCharacter] = useState(state.character);

  useEffect(() => {
    async function fetchCharacter() {
        const { data: resData } = await api.get<{ data: DataResponse }>(`/v1/public/characters/${characterId}`);
        const [ retrievedCharacter ] = resData.data.results;
        setCharacter(retrievedCharacter);
    }

    console.log(character);
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
                    character.description
                        ? character.description
                        : 'There\'s no description.'
                }</Paragraph>
            </Descriptions.Item>
        </Descriptions>

        <Descriptions title='Series' column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}>
            {character.series.items.map(serie => (
                <Descriptions.Item>
                    <Tag color="blue">
                        <Paragraph ellipsis={{ tooltip: serie.name, rows: 1 }}>
                            {serie.name}
                        </Paragraph>
                    </Tag>
                </Descriptions.Item>
            ))}
        </Descriptions>
    </PageHeader>
  );
}
