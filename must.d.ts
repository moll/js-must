interface Must {
    a: CallableMust;
    above(expected): Must;
    after(expected): Must;
    an: CallableMust;
    array(): Must;
    at: Must;
    be: CallableMust;
    before(expected): Must;
    below(expected): Must;
    between(begin, end): Must;
    boolean(): Must;
    contain(expected): Must;
    date(expected): Must;
    empty(): Must;
    endWith(expected: string): Must;
    enumerable(property: string): Must;
    enumerableProperty(property: string): Must;
    eql(expected): Must;
    equal(expected): Must;
    error(constructor?, expected?): Must;
    eventually: Must;
    exist(): Must;
    false(): Must;
    falsy(): Must;
    frozen(): Must;
    function(): Must;
    gt(expected: number): Must;
    gte(expected: number): Must;
    have: Must;
    include(expected): Must;
    instanceOf(expected): Must;
    instanceof(expected): Must;
    is(expected): Must;
    keys(expected: Array<string>): Must;
    least(expected): Must;
    length(expected: number): Must;
    lt(expected: number): Must;
    lte(expected: number): Must;
    match(expected): Must;
    most(expected: number): Must;
    must: Must;
    nan(): Must;
    nonenumerable(property: string): Must;
    nonenumerableProperty(property: string): Must;
    not: Must;
    null(): Must;
    number(): Must;
    object(): Must;
    own(property: string, value?): Must;
    ownKeys(keys: Array<string>): Must;
    ownProperties(properties: any): Must;
    ownProperty(property: string, value?): Must;
    permutationOf(expected: Array<any>): Must;
    properties(properties: any): Must;
    property(property: string, value?): Must;
    regexp(): Must;
    reject: Must;
    resolve: Must;
    startWith(expected: string): Must;
    string(): Must;
    symbol(): Must;
    the: Must;
    then: Must;
    throw(constructor?, expected?): Must;
    to: Must;
    true(): Must;
    truthy(): Must;
    undefined(): Must;
    with: Must;
}
interface CallableMust extends Must {
    (): Must;
}
declare function must(expected: any): Must;
declare namespace must {}

export = must;

declare global {
    interface String {
        must: Must;
    }
    interface Boolean {
        must: Must;
    }
    interface Number {
        must: Must;
    }
    interface Object {
        must: Must;
    }
    interface Array<T> {
        must: Must;
    }
}
