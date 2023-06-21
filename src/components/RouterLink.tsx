import { Link } from 'react-router-dom';

interface RouterLinkProps {
  children: string;
  className: string;
  to: string;
}

const RouterLink = ({ children, className, to }: RouterLinkProps) => {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
};

export default RouterLink;
