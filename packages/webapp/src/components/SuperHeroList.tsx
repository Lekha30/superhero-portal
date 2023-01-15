
import React, { useState } from "react";
import { Grid } from "@mui/material";
//components
import SearchBox from "./SearchBox";
import { useSearchSuperHeroQuery } from "../typings/generated";
import SuperHeroCard from "./SuperHeroCard";

const SuperHeroList = () => {
  const [superHero, setSuperHero] = useState<{name: string}>({name: ''});

  const [{ data, error, fetching }, searchSuperHero ] =  useSearchSuperHeroQuery({
    variables: superHero,
    requestPolicy: 'network-only',
  });

 // handle submit
  const handleSubmit = (superHero: {name: string}) => {
    setSuperHero(superHero);
  }

  // @ts-ignore
  const handleData = (data, superHero) => {
    if (data.results){
      return data.results.map((res: any) => 
        <Grid>
          <SuperHeroCard key={res.id} base={superHero.name} id={res.id} powerstats={res.powerstats} name={res.name} />
        </Grid>
      );
      } else {
        return <div>{`No records have been found for the superhero.`}</div>
      }      
    }
  
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBox handleSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12}>
          <div>Superhero details go in here!</div>
           {/* while waiting for query response */}
           {fetching && <div>{`Loading, please wait...`}</div>}
          {/* in case of query error */}
          {error && <div>{`Request error.`}</div>}
          {/* present superhero list */}
          {data && <Grid container spacing={1}>{handleData(data, superHero)}
        </Grid>}
        </Grid>
      </Grid>
    </div>
  )
};

export default SuperHeroList;