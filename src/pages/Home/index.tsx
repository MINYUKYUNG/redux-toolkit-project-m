import * as S from './style';
import { Title, Difficulty, GameBoard, Information } from '../../components';

function Home() {
  return (
    <S.HomeContainer>
      <Title />
      <Difficulty />
      <Information />
      <GameBoard />
    </S.HomeContainer>
  );
};

export default Home;
