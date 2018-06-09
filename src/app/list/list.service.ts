import { Subject } from 'rxjs';

export class ListService {

    listChanged = new Subject<string[]>();
    itemClicked = new Subject<{item: string, index: number}>();
    itemDone = new Subject<{item: string, index: number}>();
    itemDeleted = new Subject<boolean>();

    private list: string[] = [
        'Do Homework',
        'Eat Food'
    ];

    private deletedItem: {
      item: string,
      i: number
    };

    getLists() {
        return this.list.slice();
    }

    addListItem(item: string) {
        this.list.push(item);
        this.listChanged.next(this.list.slice());
    }

    removeListItem(index: number) {
        this.deletedItem = {
            item: this.list[index],
            i: index
        };
        this.itemDeleted.next(true);
        this.list.splice(index, 1);
        this.listChanged.next(this.list.slice());
    }

    updateListItem(val: string, index: number) {
        this.list[index] = val;
        this.listChanged.next(this.list.slice());
    }

    undoDeleted() {
        this.list.splice(this.deletedItem.i, 0, this.deletedItem.item);
        this.deletedItem = null;
        this.itemDeleted.next(false);
        this.listChanged.next(this.list.slice());
    }
}
