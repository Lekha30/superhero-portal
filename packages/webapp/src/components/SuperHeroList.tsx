
import React, { useState } from "react";
import { Grid } from "@mui/material";
//components
import SearchBox from "./SearchBox";
import { useSearchSuperHeroQuery } from "../typings/generated";
import SuperHeroCard from "./SuperHeroCard";

const SuperHeroList = () => {
  const [superHero, setSuperHero] = useState<string>('');

  const [{ data, error, fetching }, searchSuperHero ] =  useSearchSuperHeroQuery({
    variables: {
      name: superHero
    },
    requestPolicy: 'network-only',
    pause: !superHero
  });

 // handle submit
  const handleSubmit = (superHero: string) => {
    setSuperHero(superHero);
    searchSuperHero({variables: {name: superHero}});
  }

  // @ts-ignore
  const handleData = (data, superHero) => {
    if (data.searchSuperHero.length > 0){
      return data.searchSuperHero.map((res: any) => 
        <Grid display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <SuperHeroCard key={res.id} image={res.image} id={res.id} powerstats={res.powerstats} name={res.name} />
        </Grid>
      );
      } else {
        return <div>{`No records have been found for the superhero.`}</div>
      }      
    }
  
  return (
    <div style={{display: "flex", alignItems: "center", marginLeft: "30px"}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SearchBox handleSubmit={handleSubmit} />
        </Grid>
        <Grid item xs={12}>
           {/* while waiting for query response */}
           {!data?.searchSuperHero && fetching && <div>{`Loading, please wait...`}</div>}
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