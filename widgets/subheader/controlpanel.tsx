"use client";

import { UserTypeEnum } from "@/typing/enum";
import StatusEnum from "@/typing/enum/StatusEnum";
import React from "react";
import Edited from "@/widgets/subheader/standarduser/Edited";
import Draft from "@/widgets/subheader/standarduser/Draft";
import Delivered from "@/widgets/subheader/standarduser/Delivered";
import Pending from "@/widgets/subheader/standarduser/Pending";
import Approved from "@/widgets/subheader/standarduser/Approved";
import Cancelled from "@/widgets/subheader/standarduser/Cancelled";

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
    status: StatusEnum.PENDING,
    userType: UserTypeEnum.CLERK,
  };

  const editPanel: React.ReactNode = currentPanelStatus.edited ? (
    <Edited />
  ) : currentPanelStatus.userType.valueOf() === UserTypeEnum.CLERK.valueOf() ? (
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
  ) : null;

  return (
    <section className="flex items-center justify-between w-full">
      <h1 className="page-title">ገቢ ደብዳቤዎች</h1>
      {editPanel}
      {/* <div className="flex items-center gap-4">
        {currentPanelStatus.edited
          ? null
          : currentPanelStatus.userType
            ? currentPanelStatus.status
              ? null
              : null
            : null}

        <ForwardDialog />
        <SentDialog />
        <CancelDialog />
      </div> */}
    </section>
  );
}
