import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class Globals {
    companyCode = '1';
    userDetail: {
        // user_id: number,
        // user_name: string,
        userFullName: string,
        // user_email: string,
        // user_image_url: string,
        // user_login: boolean,
    };
}