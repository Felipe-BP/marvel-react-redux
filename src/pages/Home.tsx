import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Layout } from 'antd';

import '../styles/home.css';

import { useAppSelector } from '../hooks/useAppSelector';
import { fetchCharacterAsync, Status } from '../features/characters/characterSlice';
import { CharacterCard } from '../components/CharacterCard';

const { Content } = Layout;

export function Home() {
  const status = useAppSelector(state => state.characters.status);
  const characters = useAppSelector(state => state.characters.value?.results);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacterAsync());
  }, [dispatch]);

  return (
    <Content className="content-container">
      <div className="layout-content">
        {status !== Status.IDLE ? (
          <div>Loading...</div>
        ) : (
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            {characters?.map((character) => (
              <Col className="column" key={character.id}>
                <CharacterCard character={character} />
              </Col>
            ))}
          </Row>
        )}
      </div>
    </Content>
  );
}
