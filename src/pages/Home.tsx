import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Layout, Pagination } from 'antd';

import '../styles/home.css';

import { useAppSelector } from '../hooks/useAppSelector';
import { changeCurrentPage, fetchCharacterAsync, Status } from '../features/characters/characterSlice';
import { CharacterCard } from '../components/CharacterCard';

const { Content } = Layout;

export function Home() {
  const status = useAppSelector(state => state.characters.status);
  const {
    limit,
    total,
    offset: currentPage,
    results: characters,
  } = useAppSelector(state => state.characters.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharacterAsync());
  }, [dispatch, currentPage]);

  return (
    <Content className="content-container">
      <div className="layout-content">
        {status !== Status.IDLE ? (
          <div>Loading...</div>
        ) : (
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {characters?.map((character) => (
                <Col className="column" key={character.id}>
                  <CharacterCard character={character} />
                </Col>
              ))}
            </Row>
            <Row justify="center">
              <Pagination
                current={currentPage + 1}
                total={total}
                pageSize={limit}
                pageSizeOptions={[]}
                onChange={(page) => dispatch(changeCurrentPage(page - 1))}
              />
            </Row>
          </>
        )}
      </div>
    </Content>
  );
}
