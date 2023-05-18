export interface ModalComponent {
    /** Import and provide your component reference. */
    ref: any;
    /** Provide component props as key/value pairs. */
    props?: Record<string, unknown>;
    /** Provide an HTML template literal for the default slot. */
    slot?: string;
}
export interface ModalSettings {
    /** Designate what type of component will display. */
    type: 'alert' | 'confirm' | 'prompt' | 'component';
    /** Set the modal position within the backdrop container. */
    position?: string;
    /** Provide the modal header content. Accepts HTML. */
    title?: string;
    /** Provide the modal body content. Accepts HTML. */
    body?: string;
    /** Provide a URL to display an image within the modal. */
    image?: string;
    /** By default, used to provide a prompt value. */
    value?: any;
    /** Provide input attributes as key/value pairs. */
    valueAttr?: object;
    /** Provide your component reference key or object. */
    component?: ModalComponent | string;
    /** Provide a function. Returns the response value. */
    response?: (r: any) => void;
    /** Provide arbitrary classes to the backdrop. */
    backdropClasses?: string;
    /** Provide arbitrary classes to the modal window. */
    modalClasses?: string;
    /** Override the Cancel button label. */
    buttonTextCancel?: string;
    /** Override the Confirm button label. */
    buttonTextConfirm?: string;
    /** Override the Submit button label. */
    buttonTextSubmit?: string;
    /** Pass arbitrary data per modal instance. */
    meta?: any;
}

export interface ToastSettings {
    /** Provide the toast message. Supports HTML. */
    message: string;
    /** Provide CSS classes to set the background color. */
    background?: string;
    /** Enables auto-hide after the timeout duration. */
    autohide?: boolean;
    /** Set the auto-hide timeout duration. */
    timeout?: number;
    /** Generate a custom action button UI. */
    action?: {
        /** The button label. Supports HTML. */
        label: string;
        /** The function triggered when the button is pressed. */
        response: () => void;
    };
    /** Provide arbitrary CSS classes to style the toast. */
    classes?: string;
    /** Callback function that fires on trigger and close. */
    callback?: (response: {
        id: string;
        status: 'queued' | 'closed';
    }) => void;
}
export interface Toast extends ToastSettings {
    /** A UUID will be auto-assigned on `.trigger()`. */
    id: string;
    /** The id of the `setTimeout` if `autohide` is enabled  */
    timeoutId?: ReturnType<typeof setTimeout>;
}

export declare const modalStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<ModalSettings[]>, invalidate?: ((value?: ModalSettings[] | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
    set: (this: void, value: ModalSettings[]) => void;
    update: (this: void, updater: import("svelte/store").Updater<ModalSettings[]>) => void;
    /** Append to end of queue. */
    trigger: (modal: ModalSettings) => void;
    /**  Remove first item in queue. */
    close: () => void;
    /** Remove all items from queue. */
    clear: () => void;
};

export declare const toastStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<Toast[]>, invalidate?: ((value?: Toast[] | undefined) => void) | undefined) => import("svelte/store").Unsubscriber;
    /** Add a new toast to the queue. */
    trigger: (toast: ToastSettings) => void;
    /** Remove first toast in queue */
    close: (id: string) => void;
    /** Remove all toasts from queue */
    clear: () => void;
};

