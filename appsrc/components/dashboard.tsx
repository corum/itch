
import * as React from "react";
import {connect} from "./connect";
import {createStructuredSelector} from "reselect";
import * as classNames from "classnames";

import urls from "../constants/urls";
import * as actions from "../actions";

import GameGrid from "./game-grid";
import GameGridFilters from "./game-grid-filters";
import {map} from "underscore";

import {IState, IGameRecordSet, IItchAppProfile, IItchAppProfileMyGames} from "../types";
import {IAction, dispatcher} from "../constants/action-types";
import {ILocalizer} from "../localizer";

export class Dashboard extends React.Component<IDashboardProps, void> {
  render () {
    const {t, allGames, myGameIds, navigate} = this.props;

    const games = map(myGameIds, (id) => allGames[id]);

    let sectionCount = 0;
    if (games.length > 0) {
      sectionCount++;
    }

    const showHeaders = (sectionCount > 1);
    const headerClasses = classNames("", {shown: showHeaders});

    const tab = "dashboard";

    return <div className="dashboard-meat">
      <h2 className={headerClasses}>{t("sidebar.dashboard")}</h2>
      <GameGridFilters tab={tab}>
        <span className="link" onClick={(e) => navigate(`url/${urls.dashboard}`)}>
          {t("outlinks.open_dashboard")}
        </span>
      </GameGridFilters>
      <GameGrid tab={tab} games={games}/>
    </div>;
  }
}

interface IDashboardProps {
  // derived
  allGames: IGameRecordSet;
  myGameIds: string[];

  t: ILocalizer;

  navigate: typeof actions.navigate;
}

const mapStateToProps = createStructuredSelector({
  allGames: (state: IState) => state.market.games,
  myGameIds: (state: IState) => ((
      (
        state.market.itchAppProfile ||
        {} as IItchAppProfile
      ).myGames ||
      {} as IItchAppProfileMyGames
    ).ids || []),
});

const mapDispatchToProps = (dispatch: (action: IAction<any>) => void) => ({
  navigate: dispatcher(dispatch, actions.navigate),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
