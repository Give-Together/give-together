import React, { useState } from "react";
import { Badge, Popover, PopoverBody } from "reactstrap";
import { getQRCode } from "../../utils/getQR";

const PopoverQR = props => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);

  return (
    <div>
      <Badge color="primary" id={"Popover" + props.address}>
        <i class="fa fa-qrcode" aria-hidden="true"></i>
      </Badge>
      <Popover
        placement="bottom"
        isOpen={popoverOpen}
        target={"Popover" + props.address}
        toggle={toggle}
      >
        <PopoverBody>{getQRCode(props.address)}</PopoverBody>
      </Popover>
    </div>
  );
};

export { PopoverQR };
