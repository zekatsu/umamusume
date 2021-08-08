function choose(random_variable) {
    const dice = Math.random();
    for ([x, p] of random_variable) {
        if (dice <= p)
            return x;
    }
    console.assert(0);
}

const blue_type = [
    ['スピード', 0.2],
    ['スタミナ', 0.4],
    ['パワー', 0.6],
    ['根性', 0.8],
    ['賢さ', 1],
]

choose(blue_type);