import { Match } from "@/types";
import React, { useEffect, useRef, useState } from "react";

interface MatchCardProps {
  match: Match;
  isActive: boolean;
  onWatch: (id: string | number) => void;
  onUnwatch: (id: string | number) => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  match,
  isActive,
  onWatch,
  onUnwatch,
}) => {
  const statusLower = match.status.toLowerCase();
  const isLive = statusLower === "live";
  const [homePulse, setHomePulse] = useState(false);
  const [awayPulse, setAwayPulse] = useState(false);
  const prevScoreRef = useRef({ home: match.homeScore, away: match.awayScore });
  const pulseTimeoutRef = useRef<{
    home?: ReturnType<typeof setTimeout>;
    away?: ReturnType<typeof setTimeout>;
  }>({});

  const actionLabel = (() => {
    if (isLive) {
      return isActive ? "Watching Live" : "Watch Live";
    }
    if (statusLower === "finished") {
      return isActive ? "Viewing Recap" : "View Recap";
    }
    return isActive ? "Viewing Match" : "View Match";
  })();

  useEffect(() => {
    const prevScore = prevScoreRef.current;
    const homeChanged = prevScore.home !== match.homeScore;
    const awayChanged = prevScore.away !== match.awayScore;

    if (homeChanged) {
      setHomePulse(true);
      if (pulseTimeoutRef.current.home) {
        clearTimeout(pulseTimeoutRef.current.home);
      }
      pulseTimeoutRef.current.home = setTimeout(() => {
        setHomePulse(false);
      }, 900);
    }

    if (awayChanged) {
      setAwayPulse(true);
      if (pulseTimeoutRef.current.away) {
        clearTimeout(pulseTimeoutRef.current.away);
      }
      pulseTimeoutRef.current.away = setTimeout(() => {
        setAwayPulse(false);
      }, 900);
    }

    prevScoreRef.current = { home: match.homeScore, away: match.awayScore };

    return () => {
      if (pulseTimeoutRef.current.home) {
        clearTimeout(pulseTimeoutRef.current.home);
      }
      if (pulseTimeoutRef.current.away) {
        clearTimeout(pulseTimeoutRef.current.away);
      }
    };
  }, [match.homeScore, match.awayScore]);

  const displayStatus =
    match.status.charAt(0).toUpperCase() + match.status.slice(1).toLowerCase();

  return (
    <div
      className={` relative p-5 rounded-2xl border-2 border-black bg-white transition-all duration-200 ${isActive ? "shadow-hard -translate-x-0.5 -translate-y-0.5 ring-2 ring-[#FDE047] ring-offset-2" : "hover:shadow-hard-sm "}`}
    >
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500 border border-black rounded-full px-2 py-0.5">
          {match.sport}
        </span>

        <div className="flex items-center gap-2">
          {isLive && (
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-black"></span>
            </span>
          )}
          <span
            className={`text-sm font-medium ${isLive ? "text-red-600" : "text-gray-600"}`}
          >
            {displayStatus}
          </span>
        </div>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-[#181818] line-clamp-1">
              {match.homeTeam}
            </span>
            <span
              className={`font-bold text-2xl border border-black rounded-lg px-3 py-1 min-w-12 text-center transition-colors ${homePulse ? "bg-[#FDE047] animate-pulse" : "bg-gray-100"}`}
            >
              {match.homeScore}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-[#181818] line-clamp-1">
              {match.awayTeam}
            </span>
            <span
              className={`font-bold text-2xl border border-black rounded-lg px-3 py-1 min-w-12text-center transition-colors ${awayPulse ? "bg-[#FDE047] animate-pulse" : "bg-gray-100"}`}
            >
              {match.awayScore}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-gray-100 border-dashed">
          <span className="text-xs text-gray-500 font-medium">
            {new Date(match.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <div className="flex items-center gap-2">
            <button
              className={` px-4 py-2 rounded-full font-bold text-sm border-2 border-black transition-all ${isActive ? "bg-[#BAE6FD] text-black cursor-default opacity-100" : "bg-[#FDE047] text-black hover:bg-yellow-300 active:translate-y-0.5"}`}
            >
              {actionLabel}
            </button>
            {isActive && (
              <button className=" px-3 py-2 rounded-full font-bold text-xs border-2 border-black bg-white hover:bg-gray-50 transition-all">
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
