export class GameObject {
    public clone<T>(): T {
        const otherHalf = new (this.constructor as { new (): T });
        const keys = Object.keys(this);

        for (let i = 0; i < keys.length; ++i) {
            const property = keys[i];
            otherHalf[property] = this[property];
        }

        return otherHalf;
    }

    protected getTotalOfChildren(array: any[], callback: (elem) => number) {
        let sum = 0;
        array.forEach(elem => sum += callback(elem));
        return sum;
    }

    protected lastOf(array: any[]): any {
        return array.length > 0 ? array[array.length - 1] : null;
    }
}
