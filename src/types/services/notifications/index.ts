// types/services/notifications.ts

// Response type for fetch-notification endpoint
export interface FetchNotificationsResponse {
    data: Data;
    success: boolean;
    code: number;
    message: string;
    errors: string | null;

}
export interface Data {
    data: Notifications;


}
export interface Notifications {
    id: number;
    sms: string; // "0" or "1" indicating off/on state
    email: string; // "0" or "1" indicating off/on state
    whatsapp: string; // "0" or "1" indicating off/on state
    request_recieved: string; // "0" or "1"
    request_approved: string; // "0" or "1"
    warehouse_low: string; // "0" or "1"
    material_delivered: string; // "0" or "1"
    lease_due: string; // "0" or "1"
    payment_due: string; // "0" or "1"
    updated_by: string; // User ID of the updater
    created_at: string; // ISO timestamp
    updated_at: string; // ISO timestamp
    [key: string]: any; // Allow for additional properties
}

// Request type for update-notification endpoint
export interface UpdateNotificationRequest {
    type: string; // e.g., "request_recieved", "sms", etc.
    value: number; // 1 to enable, 0 to disable
}

// Response type for fetch-notification-types endpoint
export interface FetchNotificationTypesResponse {
    name: string; // e.g., "SMS", "Email", etc.
    id: string; // e.g., "sms", "email", etc.
}

// Optionally, define a unified NotificationSettings type
export interface NotificationSettings {
    sms: string;
    email: string;
    whatsapp: string;
    request_recieved: string;
    request_approved: string;
    warehouse_low: string;
    material_delivered: string;
    lease_due: string;
    payment_due: string;
    [key: string]: any; // Allow for additional properties
}
