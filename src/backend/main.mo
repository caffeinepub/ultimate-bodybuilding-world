import Array "mo:core/Array";
import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  // Mixins for authentication and file storage
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  type Address = {
    street : Text;
    city : Text;
    state : Text;
    postalCode : Text;
  };

  type AdmissionStatus = {
    #pending;
    #reviewed : Text;
    #approved;
    #rejected : Text;
  };

  type OnlineAdmission = {
    id : Nat;
    timestamp : Time.Time;
    name : Text;
    aadhaar : Text;
    heightCm : Float;
    weightKg : Float;
    medicalHistory : Text;
    address : Address;
    packageSelected : Text;
    paymentMode : Text;
    photo : Storage.ExternalBlob;
    status : AdmissionStatus;
  };

  type InquiryStatus = {
    #new;
    #contacted : Text;
    #closed : Text;
  };

  type Inquiry = {
    id : Nat;
    timestamp : Time.Time;
    name : Text;
    phone : Text;
    serviceInterested : Text;
    message : Text;
    status : InquiryStatus;
  };

  module OnlineAdmission {
    public func compare(admissionA : OnlineAdmission, admissionB : OnlineAdmission) : Order.Order {
      Nat.compare(admissionA.id, admissionB.id);
    };
  };

  module Inquiry {
    public func compare(inquiryA : Inquiry, inquiryB : Inquiry) : Order.Order {
      Nat.compare(inquiryA.id, inquiryB.id);
    };
  };

  let onlineAdmissions = Map.empty<Nat, OnlineAdmission>();
  let inquiries = Map.empty<Nat, Inquiry>();

  var nextAdmissionId = 1;
  var nextInquiryId = 1;

  public shared ({ caller }) func submitAdmission(
    name : Text,
    aadhaar : Text,
    heightCm : Float,
    weightKg : Float,
    medicalHistory : Text,
    address : Address,
    packageSelected : Text,
    paymentMode : Text,
    photo : Storage.ExternalBlob,
  ) : async Nat {
    let id = nextAdmissionId;
    let admission : OnlineAdmission = {
      id;
      timestamp = Time.now();
      name;
      aadhaar;
      heightCm;
      weightKg;
      medicalHistory;
      address;
      packageSelected;
      paymentMode;
      photo;
      status = #pending;
    };
    onlineAdmissions.add(id, admission);
    nextAdmissionId += 1;
    id;
  };

  public shared ({ caller }) func submitInquiry(
    name : Text,
    phone : Text,
    serviceInterested : Text,
    message : Text,
  ) : async Nat {
    let id = nextInquiryId;
    let inquiry : Inquiry = {
      id;
      timestamp = Time.now();
      name;
      phone;
      serviceInterested;
      message;
      status = #new;
    };
    inquiries.add(id, inquiry);
    nextInquiryId += 1;
    id;
  };

  public query ({ caller }) func getAdmission(id : Nat) : async OnlineAdmission {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view admission details");
    };
    switch (onlineAdmissions.get(id)) {
      case (?admission) { admission };
      case (null) { Runtime.trap("Admission not found") };
    };
  };

  public query ({ caller }) func getInquiry(id : Nat) : async Inquiry {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiry details");
    };
    switch (inquiries.get(id)) {
      case (?inquiry) { inquiry };
      case (null) { Runtime.trap("Inquiry not found") };
    };
  };

  public query ({ caller }) func getAllAdmissions() : async [OnlineAdmission] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all admissions");
    };
    onlineAdmissions.values().toArray().sort();
  };

  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray().sort();
  };

  public shared ({ caller }) func updateAdmissionStatus(id : Nat, status : AdmissionStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update admission status");
    };
    switch (onlineAdmissions.get(id)) {
      case (null) { Runtime.trap("Admission not found") };
      case (?admission) {
        let updatedAdmission = {
          id = admission.id;
          timestamp = admission.timestamp;
          name = admission.name;
          aadhaar = admission.aadhaar;
          heightCm = admission.heightCm;
          weightKg = admission.weightKg;
          medicalHistory = admission.medicalHistory;
          address = admission.address;
          packageSelected = admission.packageSelected;
          paymentMode = admission.paymentMode;
          photo = admission.photo;
          status;
        };
        onlineAdmissions.add(id, updatedAdmission);
      };
    };
  };

  public shared ({ caller }) func updateInquiryStatus(id : Nat, status : InquiryStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update inquiry status");
    };
    switch (inquiries.get(id)) {
      case (null) { Runtime.trap("Inquiry not found") };
      case (?inquiry) {
        let updatedInquiry = {
          id = inquiry.id;
          timestamp = inquiry.timestamp;
          name = inquiry.name;
          phone = inquiry.phone;
          serviceInterested = inquiry.serviceInterested;
          message = inquiry.message;
          status;
        };
        inquiries.add(id, updatedInquiry);
      };
    };
  };

  public query ({ caller }) func getAdmissionsCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view admission statistics");
    };
    onlineAdmissions.size();
  };

  public query ({ caller }) func getInquiriesCount() : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view inquiry statistics");
    };
    inquiries.size();
  };
};
