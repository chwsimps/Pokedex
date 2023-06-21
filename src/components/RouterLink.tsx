import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../app/store';
import { setInitPokemonList } from '../app/pokemonSlice';

interface RouterLinkProps {
  children: string;
  className?: string;
  to?: string | undefined;
}

const RouterLink = ({ children, className, to }: RouterLinkProps) => {
  // Redux hooks
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const stateChange = () => {
    switch (to) {
      case '/':
        dispatch(setInitPokemonList());
        navigate(to);
        break;
      case undefined:
        navigate(-1); // go back previous page
        break;
      default:
        navigate(to);
        break;
    }
  };

  return (
    <span onClick={() => stateChange()} className={className}>
      {children}
    </span>
  );
};

export default RouterLink;
