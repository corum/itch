
let r = require('r-dom')
let mori = require('mori')
let PropTypes = require('react').PropTypes
let ShallowComponent = require('./shallow-component')

let GameCell = require('./game-cell')

let always_true = () => true

/**
 * A bunch of games, as a grid
 */
class GameList extends ShallowComponent {
  render () {
    let pred = this.props.pred || always_true
    let games = this.props.games
    let caves = this.props.caves
    let owned_games_by_id = this.props.owned_games_by_id

    let index_by = (acc, k, v) => mori.assoc(acc, mori.get(v, 'game_id'), v)
    let caves_by_game_id = mori.reduceKV(index_by, mori.hashMap(), caves)

    let make_cell = (game) => {
      let game_id = mori.get(game, 'id')
      let cave = mori.get(caves_by_game_id, game_id)
      let owned = mori.get(owned_games_by_id, game_id.toString())
      if (!pred(cave)) return ''
      return r(GameCell, {key: game_id, game, cave, owned})
    }

    let children = mori.map(make_cell, mori.vals(games))

    return (
      r.div({className: 'game_list'}, mori.intoArray(children))
    )
  }
}

GameList.propTypes = {
  games: PropTypes.any,
  caves: PropTypes.any
}

module.exports = GameList
