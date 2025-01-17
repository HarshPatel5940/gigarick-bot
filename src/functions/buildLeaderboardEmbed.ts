import { PrismaClient } from "@prisma/client";
import { EmbedBuilder, userMention } from "discord.js";
import { POINTS_EMOJI } from "../config";

export function buildPointsLeaderboardEmbed(prisma: PrismaClient) {
    return new Promise<EmbedBuilder>(async (resolve) => {
        const players = await prisma.player.findMany({ orderBy: { dobbyPoints: "desc" }, take: 10 });

        const rankedPlayers = players.map((player, index) => {
            return {
                ...player,
                rank: index + 1
            };
        });

        let text = ``;

        if (rankedPlayers.length == 0) {
            text = `No players found!`;
        } else {
            for (const player of rankedPlayers) {
                text += `**${player.rank}.** ${userMention(player.discordID)} - \`${
                    player.dobbyPoints
                }\` ${POINTS_EMOJI}\n`;
            }
        }

        const embed = new EmbedBuilder()
            .setDescription(text)
            .setTimestamp()
            .setColor("Random")
            .setTitle(`🏆 Player Dobby ${POINTS_EMOJI} Leaderboard`);
        return resolve(embed);
    });
}

export function buildCheckinLeaderboardEmbed(prisma: PrismaClient) {
    return new Promise<EmbedBuilder>(async (resolve) => {
        const players = await prisma.player.findMany({ orderBy: { checkinStreak: "desc" }, take: 10 });

        const rankedPlayers = players.map((player, index) => {
            return {
                ...player,
                rank: index + 1
            };
        });

        let text = ``;

        if (rankedPlayers.length == 0) {
            text = `No players found!`;
        } else {
            for (const player of rankedPlayers) {
                text += `**${player.rank}.** ${userMention(player.discordID)} - \`${player.checkinStreak}\` days \n`;
            }
        }

        const embed = new EmbedBuilder()
            .setDescription(text)
            .setTimestamp()
            .setColor("Random")
            .setTitle(`🏆 Player Daily Check-in Leaderboard`);
        return resolve(embed);
    });
}
