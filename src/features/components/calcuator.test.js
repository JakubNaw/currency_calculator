import  round_to_two_digits from "./calculator";

test('rounding function works', () => {
    //checks if the round_to_two_digits works correctly
    expect(round_to_two_digits(1.11111)).toEqual("1.11");
});