import { Row, Col, Input, Button, Card } from 'antd';
import { Link, useHistory } from 'react-router-dom';

const { Search } = Input;

const HomePage = () => {
  let history = useHistory();

  const data = [
    {
      id: 33757,
      name: 'Sachin Rana',
      fullName: 'Sachin Rana',
    },

    {
      id: 35320,
      name: 'Sachin Tendulkar',
      fullName: 'Sachin Ramesh Tendulkar',
    },
    {
      id: 49640,
      name: 'Thilina Masmulla',
      fullName: 'Thilina Sachinda Masmulla',
    },
    {
      id: 359200,
      fullName: ' Madawa Sachinthana Warnapura',
      name: 'Madawa Warnapura',
    },
    {
      id: 424221,
      name: 'Sachin Shinde',
      fullName: 'Sachin Shinde',
    },
    {
      id: 507904,
      name: 'Sachin baby',
      fullName: 'Sachin baby',
    },
    {
      id: 432783,
      name: 'Sachin Peiris',
      fullName: 'Thatila Pitige Minoj Sachin Peiris',
    },
    {
      id: 646869,
      fullName: ' Sachin Venkata Srikar Mylavarapu',
      name: ' Sachin  Mylavarapu',
    },
    {
      id: 684479,
      fullName: 'Sachin Madusha Deshan Jayawardena',
      name: 'Sachin  Jayawardena',
    },
    {
      id: 913833,
      name: 'Sachin Jha',
      fullName: 'Sachin Jha',
    },
    {
      id: 924289,
      name: 'Sachini Nisansala',
      fullName: 'Sachini Nisansala',
    },
    {
      id: 945061,
      fullName: 'Sachin Madusha Deshan Jayawardene',
      name: 'Sachin Jayawardene',
    },
  ];

  const onSearch = (e) => {
    history.push(`/player/${e}`);
  };

  const getPlayers = () => {
    return data.map((player) => {
      return (
        <Col xs={{ span: 24 }} lg={{ span: 12 }} key={player.id}>
          <Card title={player.name}>
            <div className='getPlayers_col'>
              <Link to={`player/${player.id}`}>{player.fullName}</Link>
              {`PID to use with CricAPI: ${player.id}`}

              <Button type='primary'>
                <Link to={`player/${player.id}`}>View Details</Link>
              </Button>
            </div>
          </Card>
        </Col>
      );
    });
  };

  return (
    <div className='layout_maxWidth'>
      <Row gutter={[32, 32]} justify='center'>
        <Col>
          <Search
            placeholder='search by player PID'
            allowClear
            enterButton='Search'
            size='large'
            onSearch={onSearch}
          />
        </Col>
      </Row>
      <Row wrap gutter={[80, 80]} justify='center'>
        {getPlayers()}
      </Row>
    </div>
  );
};

export default HomePage;
