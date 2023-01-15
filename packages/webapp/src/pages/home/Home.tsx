import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {AppBar, Grid} from '@mui/material';
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Button,
  FormControl,
  Input,
} from '@mui/material';
import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material';
import { QuerySearchSuperHeroArgs, useSearchSuperHeroQuery } from '../../typings/generated';
import { useQuery } from 'urql';
import { Layout } from '../layouts/Layout';
import SuperHeroList from '../../components/SuperHeroList';
// import { SuperHeroSearch } from '../../graphql';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));


export const Home: React.FC = (props: any) => {
  const [searchSuperHeroIp, setSearchSuperHero] = React.useState<QuerySearchSuperHeroArgs>();

  // const [{ data, error, fetching }, searchSuperHero ] =  useSearchSuperHeroQuery({
  //   variables: searchSuperHeroIp,
  //   requestPolicy: 'network-only',
  // });

  const query = `
  query searchSuperHero($name: String!) {
    searchSuperHero(name: $name) {
      id
      name
      powerstats {
        intelligence
        strength
        speed
        durability
        power
        combat
      }
      image {
        url
      }
    }
  }
  `;

  const [ result, reexecuteQuery] = useQuery({
    query,
    variables: searchSuperHeroIp
  });

  console.log('result:', result);
  
  const handleSearch = ((event: any) =>  {
    event.preventDefault();
    console.log('variables:', searchSuperHeroIp);
   
    reexecuteQuery({
      variables: searchSuperHeroIp,
      requestPolicy: 'network-only',
    });
    console.log('results', result);
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('changed val:', event.target.value);
    setSearchSuperHero({ name: event?.target?.value });
  }

 const { data, fetching, error} = result;

  return (
    <Layout>
      <div style={{ marginTop: 20 }}>
        <Typography variant="h5">{`Search your favourite super hero here!`}</Typography>
      </div>
      <SuperHeroList />
    </Layout>
  );
}