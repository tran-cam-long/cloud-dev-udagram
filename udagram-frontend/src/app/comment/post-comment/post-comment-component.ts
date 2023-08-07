import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentProviderService} from "../services/comment.provider.service";
import {LoadingController, ModalController} from "@ionic/angular";

@Component({
    selector: 'app-comment-post',
    templateUrl: './post-comment-component.html',
})
export class PostCommentComponent implements OnInit {
    postForm: FormGroup;

    constructor(
        private comment: CommentProviderService,
        private formBuilder: FormBuilder,
        private loadingController: LoadingController,
        private modalController: ModalController
    ) { }

    ngOnInit() {
        this.postForm = this.formBuilder.group({
            content: new FormControl('', Validators.required)
        });
    }

    onSubmit($event) {
        $event.preventDefault();
        this.loadingController.create();

        if (!this.postForm.valid) { return; }
        this.comment.postCommentOnFeed(this.postForm.controls.feedId.value, this.postForm.controls.content.value)
            .then((result) => {
               this.modalController.dismiss();
               this.loadingController.dismiss();
            });
    }
}