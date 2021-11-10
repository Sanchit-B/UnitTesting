import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class DataService {
    getDetails() {
        const p = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve("Data");
            }, 1500);
        })

        return p;
    }
}