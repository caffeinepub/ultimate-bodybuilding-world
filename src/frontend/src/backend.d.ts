import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type InquiryStatus = {
    __kind__: "new";
    new: null;
} | {
    __kind__: "closed";
    closed: string;
} | {
    __kind__: "contacted";
    contacted: string;
};
export type Time = bigint;
export interface OnlineAdmission {
    id: bigint;
    status: AdmissionStatus;
    heightCm: number;
    name: string;
    packageSelected: string;
    aadhaar: string;
    weightKg: number;
    medicalHistory: string;
    address: Address;
    timestamp: Time;
    paymentMode: string;
    photo: ExternalBlob;
}
export type AdmissionStatus = {
    __kind__: "pending";
    pending: null;
} | {
    __kind__: "approved";
    approved: null;
} | {
    __kind__: "rejected";
    rejected: string;
} | {
    __kind__: "reviewed";
    reviewed: string;
};
export interface Inquiry {
    id: bigint;
    status: InquiryStatus;
    serviceInterested: string;
    name: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface Address {
    street: string;
    city: string;
    postalCode: string;
    state: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAdmission(id: bigint): Promise<OnlineAdmission>;
    getAdmissionsCount(): Promise<bigint>;
    getAllAdmissions(): Promise<Array<OnlineAdmission>>;
    getAllInquiries(): Promise<Array<Inquiry>>;
    getCallerUserRole(): Promise<UserRole>;
    getInquiriesCount(): Promise<bigint>;
    getInquiry(id: bigint): Promise<Inquiry>;
    isCallerAdmin(): Promise<boolean>;
    submitAdmission(name: string, aadhaar: string, heightCm: number, weightKg: number, medicalHistory: string, address: Address, packageSelected: string, paymentMode: string, photo: ExternalBlob): Promise<bigint>;
    submitInquiry(name: string, phone: string, serviceInterested: string, message: string): Promise<bigint>;
    updateAdmissionStatus(id: bigint, status: AdmissionStatus): Promise<void>;
    updateInquiryStatus(id: bigint, status: InquiryStatus): Promise<void>;
}
