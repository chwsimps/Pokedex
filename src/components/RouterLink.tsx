import { To, useNavigate } from 'react-router-dom';

interface RouterLinkProps {
  children: string;
  className?: string;
  to: To;
}

const RouterLink = ({ children, className, to }: RouterLinkProps) => {
  // Redux hooks
  const navigate = useNavigate();

  const stateChange = () => navigate(to);

  return (
    <span onClick={() => stateChange()} className={className}>
      {children}
    </span>
  );
};

export default RouterLink;
