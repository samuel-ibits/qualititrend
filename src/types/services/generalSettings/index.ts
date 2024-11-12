// types/services/generalSettings.ts

// Response type for fetch-settings endpoint
export interface FetchSettingsResponse {
    logoUrl: string;
    termsCondition: string;
    [key: string]: any; // Add other general settings fields as needed
}

// Request type for update-settings endpoint
export interface UpdateSettingsRequest {
    [key: string]: any; // Allow additional fields if multiple settings are updated at once

}

// Request type for update-terms-condition endpoint
export interface UpdateTermsConditionRequest {
    terms_condition: string;
}
