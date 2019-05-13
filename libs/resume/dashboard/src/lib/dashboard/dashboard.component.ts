import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  String40,
  String20,
  StringPath,
  StringURL,
  Environment,
  String150
} from '@nx-angular-resume/common-classes';
import { Observable, Subject } from 'rxjs';
import { IUser, AuthFacade, IUserId } from '@nx-angular-resume/auth';
import { UserFacade } from '@nx-angular-resume/user';
import { LiveChatFacade, Message } from '@nx-angular-resume/live-chat';
import { filter, takeUntil, map } from 'rxjs/operators';

interface TimelineElement {
  header: String40;
  timeRange: String40;
  secondDescription: string;
  detailLines: string[];
}

interface CardElement {
  title: String20;
  imgSrc: StringPath | StringURL;
  description: string;
}

@Component({
  selector: 'nx-angular-resume-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  user$: Observable<IUser>;
  destinationChatUser$: Observable<IUser>;
  message$: Observable<Message[]>;
  annonymousMode$: Observable<boolean>;

  mockProfessionnalData: TimelineElement[] = [
    {
      header: String40.create('Exzy Co., Ltd.'),
      timeRange: String40.create('Jan’19 – March’19 '),
      secondDescription: 'VR Showcase | Full Stack Developer',
      detailLines: [
        'Be an initiator of VR Showcase application which shows 360° models (generating from other apps in platform) in VR mode',
        'Environment: Firebase (Angularfire2), A-frame (A web framework for building VR), Angular 6, NgRx (RxJS state management inspired by Redux),'
      ]
    },
    {
      header: String40.create('Exzy Co., Ltd.'),
      timeRange: String40.create('July’16 – March’19 '),
      secondDescription: 'Smart Meeting | Frontend Developer',
      detailLines: [
        'Responsible making frontend project (architecture) that supports theme and feature customization, There are many customers in my responsibility',
        'Environment: Angular 2+, NX, Angular 6 (currently use), NgRx (RxJS state management inspired by Redux), SCSS, Git Lab'
      ]
    },
    {
      header: String40.create('Exzy Co., Ltd.'),
      timeRange: String40.create('July’16 – Nov’17'),
      secondDescription: 'Smart Meeting & Smart Office | Full Stack Developer',
      detailLines: [
        'Be an initiator of Smart Meeting platform structure that was created by frontend - backend separation design',
        'Environment: Node.js, Mongo DB, AngularJS, Angular 2, SCSS, Jasmine, Chai.js'
      ]
    },
    {
      header: String40.create('Freelancer'),
      timeRange: String40.create('Dec’15 – Aug’16'),
      secondDescription: 'Freelancer',
      detailLines: [
        'Integrating 2C2P payment method to e-commerce web application (Making Wordpress plugin) that currently use in the app.',
        'Experience with Wordpress theme customization'
      ]
    }
  ];

  mockInternData: TimelineElement[] = [
    {
      header: String40.create('Zeekamore Co., Ltd.'),
      timeRange: String40.create('Aug’15 – Dec’15'),
      secondDescription: 'RedPrice | Software Engineer',
      detailLines: [
        'Developing RedPrice my first Node.js web application using SailsJS (MVC Framework) that integration with RESTful API in a promise style',
        'Building social data pull & analysis system for notify almost real time talk data those are used in Redprice project. (JAVA, RabbitMQ, Facebook API, Twitter API)',
        'Environment: Node.js, SailsJS, SpringMVC, RabbitMQ, MongoDB'
      ]
    }
  ];

  mockTechStack: CardElement[] = [
    {
      title: String20.create('NX'),
      imgSrc: StringPath.create('/assets/images/nx-logo.png'),
      description:
        'Following Nrwl.io book which provide enterprise Angular styles guide (mono-repo).'
    },
    {
      title: String20.create('NgRx (Redux)'),
      imgSrc: StringPath.create('/assets/images/ngrx-logo.svg'),
      description:
        'RxJS state management tool which was inpired by Redux (Using with Redux dev tool for debugging with current state management)'
    },
    {
      title: String20.create('Angular'),
      imgSrc: StringPath.create('/assets/images/angular-logo.svg'),
      description: 'I have been using for 2.5+ years, '
    },
    {
      title: String20.create('TypeScript'),
      imgSrc: StringPath.create('/assets/images/ts-logo.png'),
      description:
        'Reference to "Modeling To Functional" book styles (I rarely wrote it in pure OOP)'
    },
    {
      title: String20.create('SCSS'),
      imgSrc: StringPath.create('/assets/images/sass-logo.jpg'),
      description:
        'SCSS providing a variable compiler that is the one of great theme customization tools'
    },
    {
      title: String20.create('Firebase'),
      imgSrc: StringPath.create('/assets/images/firebase-logo.png'),
      description: ''
    },
    {
      title: String20.create('Node.js'),
      imgSrc: StringPath.create('/assets/images/node-js-logo.png'),
      description: ''
    },
    {
      title: String20.create('Mongo'),
      imgSrc: StringPath.create('/assets/images/mongodb-logo.png'),
      description: ''
    }
  ];

  private unsubscribe: Subject<void> = new Subject();

  constructor(
    private authFacade: AuthFacade,
    private livechatFacade: LiveChatFacade,
    private userFacade: UserFacade,
    private env: Environment
  ) {}

  ngOnInit() {
    this.authFacade.loadAuth();
    this.user$ = this.authFacade.user$;
    this.annonymousMode$ = this.authFacade.isAnnonymous$;

    this.user$
      .pipe(
        filter(user => (user ? true : false)),
        takeUntil(this.unsubscribe)
      )
      .subscribe(user => {
        this.livechatFacade.connect(
          user.uid,
          IUserId.create(this.env.profileId)
        );
        this.destinationChatUser$ = this.userFacade.getSelectedUser(
          this.env.profileId
        );
        this.userFacade.updateUser(user);
        this.message$ = this.livechatFacade.messages$;
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  sendMessage(message: String150): void {
    this.livechatFacade.sendMessage(
      IUserId.create(this.env.profileId),
      message
    );
  }

  googleSingIn(): void {
    this.authFacade.loginWithGoogle();
  }
}
