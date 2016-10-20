import { Setup, Tuple } from './DataTypes';

export const setup: Setup = {
    players: [{
        name: "Max",
        color: "blue"
    }, {
        name: "Stefan",
        color: "green"
    }],
    cities: [
        {
            name: "Leipzig",
            x: 12,
            y: 10,
        },
        {
            name: "Tennenlohe",
            x: 10,
            y: 14,
        },
        {
            name: "Berlin",
            x: 14,
            y: 6,
        },
        {
            name: "Hamburg",
            x: 9,
            y: 4,
        },
        {
            name: "Essen",
            x: 4,
            y: 9,
        },
        {
            name: "Karlsruhe",
            x: 6,
            y: 15,
        },
        {
            name: "M\u00fcnchen",
            x: 11,
            y: 18,
        }
    ],
    links: [
        new Tuple("Leipzig", "Berlin"),
        new Tuple("Leipzig", "Tennenlohe"),
        new Tuple("Leipzig", "Essen"),
        new Tuple("Tennenlohe", "Karlsruhe"),
        new Tuple("Tennenlohe", "M\u00fcnchen"),
        new Tuple("Berlin", "Hamburg"),
        new Tuple("Hamburg", "Essen"),
        new Tuple("Essen", "Karlsruhe"),
        new Tuple("Karlsruhe", "M\u00fcnchen")
    ]
}
