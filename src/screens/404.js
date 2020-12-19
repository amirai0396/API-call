import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Some data missing from API. Choose another player or check API'
      extra={
        <Button type='primary'>
          <Link to='/'>Home</Link>
        </Button>
      }
    />
  );
};

export default NotFound;
