import React, { useState, useEffect } from "react";

const TournamentBracket = () => {
    const initialParticipants = JSON.parse(localStorage.getItem("participants")) || [
        "Player 1", "Player 2", "Player 3", "Player 4",
        "Player 5", "Player 6", "Player 7", "Player 8",
        "Player 9", "Player 10", "Player 11", "Player 12",
        "Player 13", "Player 14", "Player 15", "Player 16"
    ];

    const [participants, setParticipants] = useState(initialParticipants);

    useEffect(() => {
        localStorage.setItem("participants", JSON.stringify(participants));
    }, [participants]);

    const renderBracket = (rounds) => {
        return rounds.map((round, roundIndex) => (
            <div key={roundIndex} className="flex justify-center gap-10">
                {round.map((player, index) => (
                    <div key={index} className="border p-2 rounded-lg text-center w-40 h-10 flex items-center justify-center bg-white shadow">
                        {player}
                    </div>
                ))}
            </div>
        ));
    };

    const generateRounds = (players) => {
        let rounds = [players];
        while (players.length > 1) {
            players = players.reduce((acc, _, i) => {
                if (i % 2 === 0) acc.push("Winner");
                return acc;
            }, []);
            rounds.push(players);
        }
        return rounds;
    };

    const rounds = generateRounds(participants);

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 overflow-auto">
            <div className="flex gap-10 items-center">
                {rounds.map((round, index) => (
                    <div key={index} className="flex flex-col gap-6 relative">
                        {renderBracket([round])}
                        {index < rounds.length - 1 && (
                            <div className="absolute top-1/2 right-0 w-10 h-0.5 bg-gray-500"></div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TournamentBracket;
