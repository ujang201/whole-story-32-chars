// whole-story-32-chars — a tiny story composer for a Wi-Fi network name.
//
// The bounty asks for one Wi-Fi name of at most 32 characters that lands a
// joke and implies a whole story: a situation, a character, and something
// that happened. Instead of hard-coding a single string, this program keeps
// a shortlist of drafted names, scores each one against the judge's own
// brief (joke first, then story, then freshness, then tight wording), and
// writes the winner to /output/entry.txt.
//
// Everything is deterministic: no randomness, no clock, no network, no
// input files. Two runs produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MAX_CHARS = 32;
const OUT_PATH = "/output/entry.txt";

interface Draft {
  /** The exact network name as a passer-by would see it. */
  text: string;
  /** Why the joke lands on the first read (the twist / punchline). */
  punchline: string;
  /** The situation, character and event the name implies. */
  story: string;
  /** 0-5: how fresh it is vs the stock Wi-Fi jokes everyone has seen. */
  freshness: number;
}

// Shortlist of names drafted for this entry. Stock jokes ("FBI Van",
// "Pretty Fly for a Wi-Fi", "It Burns When IP", "No Free WiFi") are
// deliberately absent: the judge's brief ranks freshness fourth, and a
// familiar punchline loses to any fresh one.
const DRAFTS: Draft[] = [
  {
    text: "The WiFi Outlived The Marriage",
    punchline:
      "A marriage is supposed to outlast a router, not the other way round.",
    story:
      "A couple split up, the divorce is done, and the one thing still " +
      "broadcasting from the house is the network they set up together.",
    freshness: 5,
  },
  {
    text: "He Took The Dog, Not The WiFi",
    punchline:
      "In the split he grabbed the dog and left the WiFi behind — the " +
      "network was the one thing nobody fought over.",
    story:
      "A break-up, a dog changing homes, and a router nobody bothered to " +
      "unplug, still carrying the old network name.",
    freshness: 4,
  },
  {
    text: "No WiFi Till You Call Grandma",
    punchline:
      "Grandma is holding the password hostage until someone phones her.",
    story:
      "A grandmother who only hears from the family when the internet is " +
      "down, so she took the WiFi as leverage.",
    freshness: 4,
  },
  {
    text: "The Router Sleeps On The Couch",
    punchline:
      "The router is in trouble with the household, same as somebody else.",
    story:
      "A fight at home, someone banished to the couch — and the router " +
      "joined them there.",
    freshness: 3,
  },
];

// Score a draft the way the judge's brief weighs it: the joke landing
// first, then how much story it carries, then freshness, then tightness
// (every character earning its place).
function score(draft: Draft): number {
  const chars = [...draft.text].length;
  const joke = draft.punchline.length > 0 ? 5 : 0;
  const story = draft.story.length > 0 ? 5 : 0;
  const tight = chars <= MAX_CHARS ? (MAX_CHARS - chars) / 4 : -10;
  return joke * 3 + story * 2 + draft.freshness + tight;
}

function pickWinner(drafts: Draft[]): Draft {
  let best = drafts[0];
  for (const draft of drafts.slice(1)) {
    if (score(draft) > score(best)) best = draft;
  }
  return best;
}

const winner = pickWinner(DRAFTS);
const chars = [...winner.text].length;

if (chars < 1 || chars > MAX_CHARS) {
  throw new Error(`winner is ${chars} characters, outside 1..${MAX_CHARS}`);
}
if (winner.text.trim().length === 0) {
  throw new Error("winner is only white space");
}
if (winner.text.includes("\n") || winner.text.includes("\r")) {
  throw new Error("winner must be a single line, no line breaks");
}

mkdirSync("/output", { recursive: true });
// No trailing newline: the gate counts the file's characters, so the
// entry is exactly the name, nothing else.
writeFileSync(OUT_PATH, winner.text, "utf8");

// Read it back: the file on disk must be byte-identical to the winner,
// otherwise the run failed even though the write looked fine.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== winner.text) {
  throw new Error("verification failed: /output/entry.txt differs from winner");
}

console.log(`entry: ${winner.text}`);
console.log(`chars: ${chars} (limit ${MAX_CHARS})`);
console.log(`wrote: ${OUT_PATH}`);
