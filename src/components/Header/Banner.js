import React from "react";
import HeaderWrapper from "./HeaderWrapper";

import FeatureWrapper from "./FeatureWrapper";
import FeatureTitle from "./FeatureTitle";

function HeaderCompound({ project, children }) {
  return (
    <HeaderWrapper className="header-wrapper-home-category">
      <div class="layer" style={{ paddingTop: 200 }}>
        <FeatureWrapper className="feature-wrapper-home">
          <FeatureTitle className="feature-title-home">
            Discover, collect, and offset Carbon with {project}
          </FeatureTitle>
        </FeatureWrapper>
        <center>
          <h2 className="h2-sub-text">Carbon offset platform</h2>
        </center>

        {children}
      </div>
    </HeaderWrapper>
  );
}

export default HeaderCompound;
