import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import * as signalR from '@aspnet/signalr';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';
import { AppData } from '../models/app-data';
import { DinerUser } from '../models/diner-user';
import { TableService } from '../models/table-service';
import { CartillaService } from './cartilla.service';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  appName: string = 'optirest-comensal';
  appGuid: string;
  hubConnection: signalR.HubConnection;
  private appsConnectedBehaviorSubject: BehaviorSubject<AppData[]> = new BehaviorSubject<AppData[]>([]);

  constructor(
    private toastr: ToastrService,
    private cartillaService: CartillaService,
    private router: Router
  ) { }

  startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(environment.urlNotificationsHub + 'mainHub', {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();

    this.hubConnection
      .start()
      .then(() => {
        if (localStorage.getItem('appGuid') != null) {
          this.appGuid = localStorage.getItem('appGuid') ?? '';
        }
        else {
          this.appGuid = uuidv4();
          localStorage.setItem('appGuid', this.appGuid);
        }

        this.updateAppsConnected();
      })
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  updateAppsConnected = () => {
    let currentUser = JSON.parse(localStorage.getItem('currentUser') ?? '');

      this.hubConnection.invoke('SetConnectionId', this.appGuid, this.appName, currentUser.id.toString()).then(() => {
        this.hubConnection.invoke('GetAppIds').then((appIds: AppData[]) => {
          console.log('appIds:-->', appIds);
          this.appsConnectedBehaviorSubject.next(appIds);
        })
      });
  };

  sendNotificationByAppName = (message: string, appName: string) => {
    let connectionIds: string[] = this.appsConnectedBehaviorSubject.getValue().map(a => a.notificationAppData).filter(a => a.appName == appName).map(e => e.connectionId);

    this.hubConnection.invoke('sendMessage', message, connectionIds)
      .catch(err => console.error(err));
  }

  sendNotificationByAppGuid = (message: string, appGuid: string) => {
    let connectionId: string = this.appsConnectedBehaviorSubject.getValue().find(q => q.appGuid == appGuid)?.notificationAppData.connectionId ?? '';

    this.hubConnection.invoke('sendMessage', message, [connectionId])
      .catch(err => console.error(err));
  }

  startReceiveMessage = () => {
    this.hubConnection.on('receiveMessage', (message) => {

      if (message.includes('refreshorder')) {
        let currentTableService: TableService = JSON.parse(localStorage.getItem('currentTableService') ?? '');

        this.cartillaService.refreshOrderedItems(currentTableService.id);
      }

      if (message.includes('closeorder')) {
        //localStorage.removeItem('currentUser');

        this.router.navigateByUrl('/qrreading');
      }

      this.toastr.success(message);


    });
  }
}
