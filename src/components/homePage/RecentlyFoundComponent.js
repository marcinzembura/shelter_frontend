import React from "react";
import "../style/CardAnimal.css";
import CardAnimalItem from "./CardAnimalItem";
import { useEffect, useState } from "react";
import "../style/RecentlyFoundComponent.css";
import { Grid } from "@mui/material";

function RecentlyFoundComponent() {
    const [animalsArray, setAnimals] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/api/animal/last")
            .then((res) => res.json())
            .then((result) => {
                setAnimals(result);
                console.log(result);
            });
    }, []);

    return (
        <div className="recently_found">
            <h1>OSTATNIO ZNALEZIONE</h1>
            <div className="cards">
                <div className="cards__container">
                    <div className="cards__wrapper">
                        <Grid 
                        container 
                        direction="row" 
                        spacing={{ xs: 7, md: 7 }}
                        columns={{ xs: 4, sm: 20, md: 12 }}
                        alignItems="center"
                        justifyContent="center">
                            {animalsArray.map((animal) => (
                                <ul className="cards__items">
                                    <CardAnimalItem
                                        src={animal.picture}
                                        text={
                                            <p>
                                                IMIĘ: {animal.name} <tr></tr>
                                                PŁĘĆ: {animal.gender}<tr></tr>
                                                WIEK: {animal.age} lat-a<tr></tr>
                                                WAGA : {animal.weight}<tr></tr>
                                                PRZYJĘTY: {animal.date}
                                            </p>
                                        }
                                        label={"id:  " + animal.id}
                                    />
                                </ul>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RecentlyFoundComponent;
