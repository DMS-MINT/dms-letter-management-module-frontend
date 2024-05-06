"use client";

import { UserTypeEnum } from "@/typing/enum";
import StatusEnum from "@/typing/enum/StatusEnum";
import React from "react";
import Draft from "@/widgets/subheader/standarduser/Draft";
import Edited from "@/widgets/subheader/standarduser/Edited";
import Awaiting from "@/widgets/subheader/clerk/Awaiting";
import Cancelled from "@/widgets/subheader/standarduser/Cancelled";
import Approved from "@/widgets/subheader/clerk/Approved";
import Delivered from "@/widgets/subheader/clerk/Delivered";
import Pending from "@/widgets/subheader/standarduser/Pending";
interface IPanel {
  edited: boolean;
  status: StatusEnum;
  userType: UserTypeEnum;
}
export default function ControlPanel() {
  function refreshPage() {
    window.location.reload();
  }

  const currentPanelStatus: IPanel = {
    edited: false,
    status: StatusEnum.CANCELLED,
    userType: UserTypeEnum.STANDARD_USER,
  };

  const editPanel: React.ReactNode = currentPanelStatus.edited ? (
    <Edited />
  ) : currentPanelStatus.userType.valueOf() ===
    UserTypeEnum.STANDARD_USER.valueOf() ? (
    currentPanelStatus.status.valueOf() === StatusEnum.DRAFT.valueOf() ? (
      <Draft />
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.APPROVED.valueOf() ? (
      <Approved />
    ) : currentPanelStatus.status.valueOf() === StatusEnum.PENDING.valueOf() ? (
      <Pending />
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.DELIVERED.valueOf() ? (
      <Delivered />
    ) : currentPanelStatus.status.valueOf() === StatusEnum.EDITED.valueOf() ? (
      <Edited />
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.CANCELLED.valueOf() ? (
      <Cancelled />
    ) : null
  ) : currentPanelStatus.userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
    currentPanelStatus.status.valueOf() === StatusEnum.APPROVED.valueOf() ? (
      <Approved />
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.AWAITING.valueOf() ? (
      <Awaiting />
    ) : currentPanelStatus.status.valueOf() ===
      StatusEnum.DELIVERED.valueOf() ? (
      <Delivered />
    ) : null
  ) : null;

  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">
        የሩሲያ ፌዴሬሽን ባዘጋጀው የዕውቅና ሽልማት ላይ ተሳትፎ እንዲደረግ ስለማሳወቅ
      </h1>
      {editPanel}
    </section>
  );
}
