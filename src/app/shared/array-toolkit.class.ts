export class ArrayToolkit {
    protected getTotalOfChildren(array: any[], callback: (elem) => number) {
        let sum = 0;
        array.forEach(elem => sum += callback(elem));
        return sum;
    }

    protected lastOf(array: any[]): any {
        return array[array.length - 1];
    }
}
