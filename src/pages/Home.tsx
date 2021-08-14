import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Row, Col, Layout, Pagination, Empty, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import "../styles/home.css";

import { useAppSelector } from "../hooks/useAppSelector";
import {
  changeCurrentPage,
  fetchCharactersAsync,
  Status,
} from "../features/characters/characterSlice";
import { CharacterCard } from "../components/CharacterCard";
import { CharacterSearch } from "../components/CharacterSearch";

const { Content } = Layout;

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

export function Home() {
  const { status, searchValue } = useAppSelector((state) => state.characters);
  const {
    limit,
    total,
    offset: currentPage,
    results: characters,
  } = useAppSelector((state) => state.characters.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCharactersAsync());
  }, [dispatch, currentPage, searchValue]);

  return (
    <Content className="content-container">
      <div className="layout-content">
        <Row className="search" justify="center">
          <Col span={10}>
            <CharacterSearch />
          </Col>
        </Row>

        {status === Status.LOADING && <Spin indicator={antIcon} />}

        {status === Status.IDLE && !characters.length && (<Empty />)}

        {status === Status.IDLE && characters.length && (
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
