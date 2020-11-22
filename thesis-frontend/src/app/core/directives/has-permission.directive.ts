import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {PermissionService} from '../services';
import {PermissionsEnum} from '../enums';
import {takeUntil} from 'rxjs/operators';
import {CleanUpHelper} from '../utils';

@Directive({
  selector: '[tsHasPermission]'
})
export class HasPermissionDirective extends CleanUpHelper implements OnInit {

  #_permission: PermissionsEnum | string;

  constructor(private viewContainer: ViewContainerRef,
              private templateRef: TemplateRef<any>,
              private permissionService: PermissionService) {
    super();
  }

  ngOnInit(): void {
    this.permissionService.permissionsChanged$.pipe(
      takeUntil(this.onDestroy$)
    ).subscribe(() => {
      this._toggleVisibility();
    });
  }

  get permission(): PermissionsEnum | string {
    return this.#_permission;
  }

  @Input('tsHasPermission')
  set permission(value: PermissionsEnum | string) {
    this.#_permission = value;
    this._toggleVisibility();
  }

  _toggleVisibility(): void {
    if (this.permissionService.hasPermission(this.#_permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
