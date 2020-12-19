import { useState, useEffect } from 'react';
import { Row, Col, Image, Table, Card } from 'antd';

const PlayerProfile = ({ match, history }) => {
  const [playerProfile, setPlayerProfile] = useState({});
  const [dataSourceBatting, setDataSourceBatting] = useState([]);
  const [columnsBatting, setColumnsBatting] = useState([]);
  const [dataSourceBowling, setDataSourceBowling] = useState([]);
  const [columnsBowling, setColumnsBowling] = useState([]);

  let dataSource = [
    {
      key: '1',
      row: 'Plays for',
      column: playerProfile.country,
    },

    {
      key: '2',
      row: 'Born',
      column: playerProfile.born,
    },
    {
      key: '3',
      row: 'Batting Style',
      column: playerProfile.battingStyle,
    },
    {
      key: '4',
      row: 'Bowling Style	',
      column: playerProfile.bowlingStyle,
    },
  ];

  const columns = [
    {
      title: '',
      dataIndex: 'row',
      key: 'row',
    },
    {
      title: '',
      dataIndex: 'column',
      key: 'column',
    },
  ];

  const normalizeColumns = (type, colToAdd) => {
    const entries = playerProfile.data[type].firstClass;
    const value = Object.keys(entries).map((key) => {
      return {
        title: key,
        dataIndex: key.toLowerCase(),
        key: key.toLowerCase(),
      };
    });
    return [colToAdd, ...value];
  };

  const normalizeDataSource = (num, type, category) => {
    const entries = playerProfile.data[type][category];
    let value = {};

    Object.keys(entries).forEach((key) => {
      value[key.toLowerCase()] = entries[key];
    });
    value.league = category;
    value.key = num;

    return value;
  };

  const setComponentState = () => {
    setColumnsBowling(
      normalizeColumns('bowling', {
        title: 'league',
        dataIndex: 'league',
        key: 'league',
      })
    );
    setColumnsBatting(
      normalizeColumns('batting', {
        title: 'league',
        dataIndex: 'league',
        key: 'league',
      })
    );
    setDataSourceBowling([
      normalizeDataSource('1', 'bowling', 'firstClass'),
      normalizeDataSource('2', 'bowling', 'listA'),
    ]);

    setDataSourceBatting([
      normalizeDataSource('1', 'batting', 'firstClass'),
      normalizeDataSource('2', 'batting', 'listA'),
    ]);
  };

  useEffect(() => {
    getPlayerDetails(match.params.id);
  }, [match.params.id]);

  useEffect(() => {
    if (playerProfile.name) {
      if (!Object.keys(playerProfile.data.batting).length) {
        history.push('/404');
      } else {
        setComponentState();
      }
    }
    // eslint-disable-next-line
  }, [playerProfile.name]);

  const getPlayerDetails = async (id) => {
    const url = 'https://cricapi.com/api/playerStats';
    const data = {
      pid: id,
      apikey: 'X6sFEeyufChRsJ46VxB9mzzrdpk2',
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    setPlayerProfile(await response.json());
  };
  const gridStyle = {
    width: '33.33%',
    textAlign: 'left',
  };
  return (
    <>
      {playerProfile.name && (
        <div className='layout_maxWidth background_image'>
          <Row justify='center'>
            <Col>
              <Image
                className='ant-image-dp'
                width={150}
                src={playerProfile.imageURL}
              />
            </Col>
          </Row>
          <Row justify='center'>
            <Col>
              <Image
                width={50}
                src={`http://cdx.cricapi.com/country/Flag%20Of%20${playerProfile.country}.png`}
              />
            </Col>
            <Col>
              <p>{playerProfile.name}</p>
            </Col>
          </Row>
          <Row style={{ marginBottom: '24px' }} justify='center'>
            <Col span={22}>
              <Card size='small' title='Major Teams Affiliated With'>
                {playerProfile.majorTeams &&
                  playerProfile.majorTeams.split(',').map((item) => {
                    return (
                      <Card.Grid
                        bordered='false'
                        size='small'
                        hoverable={false}
                        style={gridStyle}
                      >
                        {item}
                      </Card.Grid>
                    );
                  })}
              </Card>
            </Col>
          </Row>

          <Row justify='center'>
            <Col span={22}>
              <Table
                className='hideHeader'
                size='small'
                pagination={false}
                dataSource={dataSource}
                columns={columns}
              />
              ;
            </Col>
          </Row>
          <p>Batting Performance - as in the API</p>
          <Row justify='center'>
            <Col span={22}>
              <Table
                size='small'
                pagination={false}
                dataSource={dataSourceBatting}
                columns={columnsBatting}
              />
              ;
            </Col>
          </Row>
          <p>Bowling Performance - as in the API</p>
          <Row justify='center'>
            <Col span={22}>
              <Table
                size='small'
                pagination={false}
                dataSource={dataSourceBowling}
                columns={columnsBowling}
              />
              ;
            </Col>
          </Row>
        </div>
      )}
    </>
  );
};

export default PlayerProfile;
