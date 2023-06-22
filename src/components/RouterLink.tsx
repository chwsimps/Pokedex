import { useDispatch } from 'react-redux';
import { To, useNavigate } from 'react-router-dom';
import { AppDispatch } from '../store/store';
import { setInitPokemonList } from '../store/pokemon/pokemonSlice';

interface RouterLinkProps {
  children: string;
  className?: string;
  to: To;
}

const RouterLink = ({ children, className, to }: RouterLinkProps) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const stateChange = () => {
    if (to === '/') {
      dispatch(setInitPokemonList());
    }
    navigate(to);
  };

  return (
    <span onClick={() => stateChange()} className={className}>
      {children}
    </span>
  );
};

export default RouterLink;
